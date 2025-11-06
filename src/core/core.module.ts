import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRootAsync({
              useFactory(config: ConfigService) {
                console.log(config.get('POSTGRES_USER'));
                return {
                  type: 'postgres',
                  host: 'localhost',
                  port: 5432,
                  password: config.get('POSTGRES_PASSWORD'),
                  username: config.get('POSTGRES_USER'),
                  autoLoadEntities: true,
                  synchronize: true,
                };
              },
              imports: [ConfigModule],
              inject: [ConfigService],
            }),
          ]
        : [];
    return {
      module: CoreModule,
      imports,
    };
  }
}
