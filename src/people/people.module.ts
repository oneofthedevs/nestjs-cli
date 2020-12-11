import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
    imports: [],
    controllers: [PeopleController],
    providers: [PeopleService],
})
export class PeopleModule { }
