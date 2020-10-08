import * as Yup from 'yup';

import User from '../models/User';

class MoviesController {
  async store(req, res) {
    // const schema = Yup.object().shape({
    //   provider_id: Yup.number().required(),
    //   date: Yup.date().required(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' });
    // }



    const { provider_id, } = req.body;

   
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    if (provider_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'Cannot create an appointment with yourself' });
    }

    

  
  
    return res.json(appointment);
  }

  async delete(req, res) {
    return res.json('ok');
  }
}

export default new MoviesController();
