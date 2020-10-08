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
    
    
    // const { provider_id, } = req.body;
    try{
      const {name, description} = req.body
      const checkIsAdmin= await User.findOne({
        where: { id: req.userId, admin: true },
      });
   
      if (!checkIsAdmin) {
        return res
          .status(401)
          .json({ error: 'You can only create appointments with providers' });
        }
        return res.json('é admin');

   }catch(e){
     console.log(e)
   }
   
    
  
  
  }

  async delete(req, res) {
    return res.json('ok');
  }
}

export default new MoviesController();
