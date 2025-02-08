import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {
  static register(db: any): DynamicModule {
    return {
      module: AppModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: db,
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
