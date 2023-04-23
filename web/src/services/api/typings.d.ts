declare namespace API {

  type Response<T> = {
    status: string;
    success: boolean;
    errCode: string;
    errMessage: string;
    data: T;
  }

  type PageResponse<T> = {
    success: boolean;
    errCode: string;
    errMessage: string;
    data: {
      total: number;
      list: T;
    };
  }

  type CurrentUser = {
    username?: string;
    authorities?:string[];
    avatar?: string;
  };

}
