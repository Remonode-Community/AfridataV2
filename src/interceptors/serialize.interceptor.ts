import {  
  UseInterceptors,
  ExecutionContext,
  NestInterceptor,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'


interface ClassConstructor {
  new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor){
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any){}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Runs before a request is handled
    return handler.handle().pipe(
      map((data: any) => {
        //Runs before response is sent out
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}