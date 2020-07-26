// import { PrismaService } from '../services/prisma.service';

// export abstract class BaseService<T extends string> {
//   protected _modelName!: T;
//   // tslint:disable-next-line: no-any
//   protected _model: any;

//   constructor(private _prismaService: PrismaService) {
//     if (this._modelName === 'User') {
//       this._model = this._prismaService.user;
//     } else if (this._modelName === 'Auth') {
//     }
//   }

//   async findAll(filter = {}): Promise<InstanceType<T>[]> {
//     return this._model.find(filter).exec();
//   }

//   async findOne(filter = {}): Promise<InstanceType<T>> {
//     return this._model.findOne(filter).exec();
//   }

//   async findById(id: string): Promise<InstanceType<T>> {
//     return this._model.findById(this.toObjectId(id)).exec();
//   }

//   async create(item: InstanceType<T>): Promise<InstanceType<T>> {
//     return this._model.create(item);
//   }

//   async delete(id: string): Promise<InstanceType<T>> {
//     return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
//   }

//   async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
//     return this._model
//       .findByIdAndUpdate(this.toObjectId(id), item, { new: true })
//       .exec();
//   }

//   async clearCollection(filter = {}): Promise<{ ok?: number; n?: number }> {
//     return this._model.deleteMany(filter).exec();
//   }

//   private toObjectId(id: string): Types.ObjectId {
//     return Types.ObjectId(id);
//   }
// }
