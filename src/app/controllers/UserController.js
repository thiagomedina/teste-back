import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';

import authConfig from '../../config/auth';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6, 'minimum 6 digits'),
      admin: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, admin } = await User.create(req.body);

    return res.json({
      user: {
        id,
        name,
        email,
        admin,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      admin: Yup.boolean(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6, 'minimum 6 digits')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const userActived = await User.findOne({
      where: { id: req.userId, status: true },
    });

    if (!userActived) {
      return res.status(400).json({ error: 'User disabled.' });
    }

    if (email && email !== userActived.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, admin } = await userActived.update(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }

  async deactivation(req, res) {
    try {
      const userActived = await User.findOne({
        where: { id: req.userId, status: true },
      });

      if (!userActived) {
        return res.status(400).json({ error: 'User disabled.' });
      }

      await userActived.update({
        status: false,
      });

      return res.status(200).json('User successfully disabled');
    } catch (e) {
      return res.status(401).json( {error:'It was not possible to disable the user, try again'});
    }
  }
}

export default new UserController();
