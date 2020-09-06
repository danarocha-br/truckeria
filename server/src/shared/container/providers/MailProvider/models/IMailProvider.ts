import ISendMailDTO from '../dtos/ISendMailDTO';
export default interface IMailProvider {
  sendEmail(data: ISendMailDTO): Promise<void>;
}
