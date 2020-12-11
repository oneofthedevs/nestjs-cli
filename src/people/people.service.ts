import { InsertPeople } from './InsertPeople.model';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { People } from './people.model';

@Injectable()
export class PeopleService {
  private people: People[] = [];

  async insertPeople(peopleObj: InsertPeople) {
    // If there is empty field, 204 will be sent
    if (!this.checkFields(peopleObj))
      throw new BadRequestException('All fields required');

    // Creating new object of People class
    const newPeople = new People(
      Date.now().toString(),
      peopleObj.name,
      peopleObj.dob,
      peopleObj.height,
      peopleObj.hair_color,
      peopleObj.eye_color,
      peopleObj.species,
    );
    this.people.push(newPeople);
    return newPeople;
  }

  async getAllPeople() {
    // returning whole array
    return this.people.slice();
  }

  async getPeople(id: string) {
    const person = this.findPerson(id)[0];

    // If person isn't found, 404 will be sent
    if (!person) throw new NotFoundException('Could not find product');
    return { ...person };
  }

  async updatePerson(peopleObj: People) {
    // If id is null, 204 will be sent
    if (!peopleObj.id)
      throw new BadRequestException('All fields required');

    const index = this.findPerson(peopleObj.id)[1];
    console.log(index);

    // If person isn't found, 404 will be sent
    if (index === null || undefined)
      throw new NotFoundException('Could not find person');

    return this._updatePerson(peopleObj, index);
  }

  async deletePerson(id: string) {
    // If person isn't found, 404 will be sent
    if (this.findPerson(id)[0] === null || undefined)
      throw new NotFoundException('Could not find person');
    this.people.filter((x) => x.id !== id);
    return { message: 'Record Deleted Successfully' };
  }

  private findPerson(id: string): [People, number] {
    // finding the index of the ID
    const index = this.people.findIndex((x) => x.id === id);

    // returning person object and ID
    console.log(index, this.people[index])
    return [this.people[index], index];
  }

  private _updatePerson(personObj: People, index: number) {
    // Field = new Value, if new value === null, keep the old value
    this.people[index].name = personObj.name || this.people[index].name;
    this.people[index].dob = personObj.dob || this.people[index].dob;
    this.people[index].eye_color =
      personObj.eye_color || this.people[index].eye_color;
    this.people[index].hair_color =
      personObj.hair_color || this.people[index].hair_color;
    this.people[index].species =
      personObj.species || this.people[index].species;
    this.people[index].height = personObj.height || this.people[index].height;

    // returning the updated person model
    return this.people[index];
  }

  private checkFields(peopleObj: People | InsertPeople) {
    // If all values exist, send true else false
    return peopleObj.name &&
      peopleObj.dob &&
      peopleObj.eye_color &&
      peopleObj.hair_color &&
      peopleObj.height &&
      peopleObj.species
      ? true
      : false;
  }
}
