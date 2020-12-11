import { People } from './people.model';
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { PeopleService } from './people.service';
import { InsertPeople } from './InsertPeople.model';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  // Get all records
  @Get('get')
  async getAllPeople() {
    return await this.peopleService.getAllPeople();
  }

  // Get specific record
  @Get('get/:id')
  async getSinglePerson(@Param('id') peopleId: string) {
    return await this.peopleService.getPeople(peopleId);
  }

  // Add a record
  @Post('insert')
  async addToPeople(@Body() peopleObject: InsertPeople) {
    return await this.peopleService.insertPeople(peopleObject);
  }

  // Update a record
  @Patch('update/')
  async updatePerson(@Body() peopleObject: People) {
    return await this.peopleService.updatePerson(peopleObject);
  }

  @Delete('delete/:id')
  @HttpCode(204)
  async removePerson(@Param() id: string) {
    return await this.peopleService.deletePerson(id);
  }
}
