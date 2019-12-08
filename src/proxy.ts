import { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import * as HttpStatus from 'http-status-codes';

export enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface ErrorData {
  showAlert: boolean;
  message: string;
}

export type customErrorData = Map<number, ErrorData>;

export default class Proxy {
  public ajax: AxiosInstance;

  private allowedMethods: Set<HttpMethod>;

  private handleGet: (req: NextApiRequest, res: NextApiResponse) => void;

  private handlePost: (req: NextApiRequest, res: NextApiResponse) => void;

  private handlePut: (req: NextApiRequest, res: NextApiResponse) => void;

  private handleDelete: (req: NextApiRequest, res: NextApiResponse) => void;

  private handlePatch: (req: NextApiRequest, res: NextApiResponse) => void;

  private handleHead: (req: NextApiRequest, res: NextApiResponse) => void;

  constructor(ajax: AxiosInstance) {
    this.ajax = ajax;
    this.allowedMethods = new Set<HttpMethod>();
  }

  addMethod(
    method: HttpMethod,
    handleMethod?: (req: NextApiRequest, res: NextApiResponse) => void,
  ): void {
    this.allowedMethods.add(method);
    if (handleMethod) {
      switch (method) {
        case HttpMethod.GET:
          this.handleGet = handleMethod;
          break;
        case HttpMethod.POST:
          this.handlePost = handleMethod;
          break;
        case HttpMethod.PUT:
          this.handlePut = handleMethod;
          break;
        case HttpMethod.DELETE:
          this.handleDelete = handleMethod;
          break;
        case HttpMethod.HEAD:
          this.handleHead = handleMethod;
          break;
        case HttpMethod.PATCH:
          this.handlePatch = handleMethod;
          break;
        default:
        // you should not be here
      }
    } else {
      switch (method) {
        case HttpMethod.GET:
          this.handleGet = async function(
            req: NextApiRequest,
            res: NextApiResponse,
          ): Promise<void> {
            try {
              const response = await this.ajax.get(
                req.url,
                req.cookies.jwt
                  ? {
                      headers: { Authorization: req.cookies.jwt },
                    }
                  : {},
              );
              res.status(response.status).json(response.data);
            } catch (error) {
              res.status(error.response.status).json(error.response.data);
            }
          };
          break;
        case HttpMethod.POST:
          this.handlePost = async function(
            req: NextApiRequest,
            res: NextApiResponse,
          ): Promise<void> {
            try {
              const response = await this.ajax.post(
                req.url,
                req.body,
                req.cookies.jwt
                  ? {
                      headers: { Authorization: req.cookies.jwt },
                    }
                  : {},
              );
              res.status(response.status).json(response.data);
            } catch (error) {
              res.status(error.response.status).json(error.response.data);
            }
          };
          break;
        case HttpMethod.PUT:
          this.handlePut = async function(
            req: NextApiRequest,
            res: NextApiResponse,
          ): Promise<void> {
            try {
              const response = await this.ajax.put(
                req.url,
                req.body,
                req.cookies.jwt
                  ? {
                      headers: { Authorization: req.cookies.jwt },
                    }
                  : {},
              );
              res.status(response.status).json(response.data);
            } catch (error) {
              res.status(error.response.status).json(error.response.data);
            }
          };
          break;
        case HttpMethod.DELETE:
          this.handleDelete = async function(
            req: NextApiRequest,
            res: NextApiResponse,
          ): Promise<void> {
            try {
              const response = await this.ajax.delete(
                req.url,
                req.cookies.jwt
                  ? {
                      headers: { Authorization: req.cookies.jwt },
                    }
                  : {},
              );
              res.status(response.status).json(response.data);
            } catch (error) {
              res.status(error.response.status).json(error.response.data);
            }
          };
          break;
        case HttpMethod.HEAD:
          this.handleHead = async function(
            req: NextApiRequest,
            res: NextApiResponse,
          ): Promise<void> {
            try {
              const response = await this.ajax.head(
                req.url,
                req.cookies.jwt
                  ? {
                      headers: { Authorization: req.cookies.jwt },
                    }
                  : {},
              );
              res.status(response.status).json(response.data);
            } catch (error) {
              res.status(error.response.status).json(error.response.data);
            }
          };
          break;
        case HttpMethod.PATCH:
          this.handlePatch = async function(
            req: NextApiRequest,
            res: NextApiResponse,
          ): Promise<void> {
            try {
              const response = await this.ajax.patch(
                req.url,
                req.body,
                req.cookies.jwt
                  ? {
                      headers: { Authorization: req.cookies.jwt },
                    }
                  : {},
              );
              res.status(response.status).json(response.data);
            } catch (error) {
              res.status(error.response.status).json(error.response.data);
            }
          };
          break;
        default:
        // you should not be here
      }
    }
  }

  addMethodWithCustomErrorData(
    method: HttpMethod,
    customErrorData: customErrorData,
  ): void {
    this.allowedMethods.add(method);
    switch (method) {
      case HttpMethod.GET:
        this.handleGet = async function(
          req: NextApiRequest,
          res: NextApiResponse,
        ): Promise<void> {
          try {
            const response = await this.ajax.get(
              req.url,
              req.cookies.jwt
                ? {
                    headers: { Authorization: req.cookies.jwt },
                  }
                : {},
            );
            res.status(response.status).json(response.data);
          } catch (error) {
            res
              .status(error.response.status)
              .json(
                customErrorData.get(error.response.status) ||
                  error.response.data,
              );
          }
        };
        break;
      case HttpMethod.POST:
        this.handlePost = async function(
          req: NextApiRequest,
          res: NextApiResponse,
        ): Promise<void> {
          try {
            const response = await this.ajax.post(
              req.url,
              req.body,
              req.cookies.jwt
                ? {
                    headers: { Authorization: req.cookies.jwt },
                  }
                : {},
            );
            res.status(response.status).json(response.data);
          } catch (error) {
            res
              .status(error.response.status)
              .json(
                customErrorData.get(error.response.status) ||
                  error.response.data,
              );
          }
        };
        break;
      case HttpMethod.PUT:
        this.handlePut = async function(
          req: NextApiRequest,
          res: NextApiResponse,
        ): Promise<void> {
          try {
            const response = await this.ajax.put(
              req.url,
              req.body,
              req.cookies.jwt
                ? {
                    headers: { Authorization: req.cookies.jwt },
                  }
                : {},
            );
            res.status(response.status).json(response.data);
          } catch (error) {
            res
              .status(error.response.status)
              .json(
                customErrorData.get(error.response.status) ||
                  error.response.data,
              );
          }
        };
        break;
      case HttpMethod.DELETE:
        this.handleDelete = async function(
          req: NextApiRequest,
          res: NextApiResponse,
        ): Promise<void> {
          try {
            const response = await this.ajax.delete(
              req.url,
              req.cookies.jwt
                ? {
                    headers: { Authorization: req.cookies.jwt },
                  }
                : {},
            );
            res.status(response.status).json(response.data);
          } catch (error) {
            res
              .status(error.response.status)
              .json(
                customErrorData.get(error.response.status) ||
                  error.response.data,
              );
          }
        };
        break;
      case HttpMethod.HEAD:
        this.handleHead = async function(
          req: NextApiRequest,
          res: NextApiResponse,
        ): Promise<void> {
          try {
            const response = await this.ajax.head(
              req.url,
              req.cookies.jwt
                ? {
                    headers: { Authorization: req.cookies.jwt },
                  }
                : {},
            );
            res.status(response.status).json(response.data);
          } catch (error) {
            res
              .status(error.response.status)
              .json(
                customErrorData.get(error.response.status) ||
                  error.response.data,
              );
          }
        };
        break;
      case HttpMethod.PATCH:
        this.handlePatch = async function(
          req: NextApiRequest,
          res: NextApiResponse,
        ): Promise<void> {
          try {
            const response = await this.ajax.patch(
              req.url,
              req.body,
              req.cookies.jwt
                ? {
                    headers: { Authorization: req.cookies.jwt },
                  }
                : {},
            );
            res.status(response.status).json(response.data);
          } catch (error) {
            res
              .status(error.response.status)
              .json(
                customErrorData.get(error.response.status) ||
                  error.response.data,
              );
          }
        };
        break;
      default:
      // you should not be here
    }
  }

  serve(req: NextApiRequest, res: NextApiResponse): void {
    if (!this.allowedMethods.has(req.method as HttpMethod)) {
      res.setHeader('Allow', [...this.allowedMethods]);
      res
        .status(HttpStatus.METHOD_NOT_ALLOWED)
        .end(`Method ${req.method} Not Allowed`);
    } else {
      switch (req.method) {
        case HttpMethod.GET:
          this.handleGet(req, res);
          break;
        case HttpMethod.POST:
          this.handlePost(req, res);
          break;
        case HttpMethod.PUT:
          this.handlePut(req, res);
          break;
        case HttpMethod.DELETE:
          this.handleDelete(req, res);
          break;
        case HttpMethod.PATCH:
          this.handlePatch(req, res);
          break;
        case HttpMethod.HEAD:
          this.handleHead(req, res);
          break;
        default:
      }
    }
  }
}
