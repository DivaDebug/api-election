import {HttpException} from './http.exception.js';
import {Model} from 'mongoose';

export class HttpResourceNotFoundException extends HttpException {
  constructor(model: Model<any> | string) {
    const modelName = typeof model === 'string' ? model : model.modelName;

    super(404, `Resource ${modelName} not found`);
  }
}
