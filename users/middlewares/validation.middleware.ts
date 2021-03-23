const validate = (schema: { validateAsync: (arg0: any) => any; }) => async( req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: any): void; new(): any; }; }; }, next: () => void ) => {
  try{
     await schema.validateAsync(req.body);
      next();
  }
  catch(err){
    res.status(400).send(err);
  }
};

module.exports = validate;
