declare namespace Express{

  //fazer um anexo junto do Request que já existe no express
  export interface Request{
    user:{
      id: string;
    }

  }
}
