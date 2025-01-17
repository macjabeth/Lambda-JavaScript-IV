// Lambda Classes

class Person {
  constructor (attributes) {
    this.name = attributes.name;
    this.age = attributes.age;
    this.location = attributes.location;
    this.gender = attributes.gender;
  }

  speak () {
    console.log(`Hello my name is ${this.name}, I am from ${this.location}`);
  }
}

class Instructor extends Person {
  constructor (attributes) {
    super(attributes);
    this.specialty = attributes.specialty;
    this.favLanguage = attributes.favLanguage;
    this.catchPhrase = attributes.catchPhrase;
  }

  demo (subject) {
    console.log(`Today we are learning about ${subject}`);
  }

  grade (student, subject) {
    console.log(`${student.name} receives a perfect score on ${subject}`);
  }

  changeScore (student) {
    const amount = Math.floor(Math.random() * 50);
    if (student.grade > 50) {
      student.grade -= amount;
    } else {
      student.grade += amount;
    }
  }
}

class Student extends Person {
  constructor (attributes) {
    super(attributes);
    this.previousBackground = attributes.previousBackground;
    this.className = attributes.className;
    this.favSubjects = attributes.favSubjects;
    this.grade = attributes.grade;
  }

  listSubjects () {
    console.log(this.favSubjects.join('\n'));
  }

  prAssignment (subject) {
    console.log(`${this.name} has submitted a PR for ${subject}`);
  }

  sprintChallenge (subject) {
    console.log(`${this.name} has begun sprint challenge on ${subject}`);
  }

  graduate () {
    if (this.grade > 70) {
      console.log(`${this.name} has graduated with a whopping high score of ${this.grade}%`);
    } else {
      this.grade += 5;
    }
  }
}

class ProjectManager extends Instructor {
  constructor (attributes) {
    super(attributes);
    this.gradClassName = attributes.gradClassName;
    this.favInstructor = attributes.favInstructor;
  }

  standUp (channel) {
    console.log(`${this.name} announces to ${channel}, @channel standy times!`);
  }

  debugCode (student, subject) {
    console.log(`${this.name} debugs ${student.name}'s code on ${subject}`);
  }
}

// Let's get testy with it.

const omarSalahEddine = new Student({
  name: 'Omar',
  location: 'Chamber of Secrets',
  age: 23,
  gender: 'male',
  previousBackground: 'College student',
  className: 'WEB17',
  favSubjects: ['cat grooming', 'bakery sciences'],
  grade: 100
});

const javontayMcElroy = new Student({
  name: 'Javontay',
  location: 'Chamber of Secrets',
  age: 19,
  gender: 'male',
  className: 'WEB17',
  previousBackground: `Dunkin' Donuts`,
  favSubjects: ['digital art'],
  grade: 100
});

omarSalahEddine.listSubjects();
javontayMcElroy.sprintChallenge('JS IV');
omarSalahEddine.prAssignment('Project #4');
omarSalahEddine.graduate();

const joshKnell = new Instructor({
  name: 'Josh',
  location: 'Webrock',
  age: 35,
  gender: 'male',
  favLanguage: 'PHP',
  specialty: 'Back-End',
  catchPhrase: 'Yaaaas'
});

const ryanHamblin = new Instructor({
  name: 'Ryan',
  location: 'Austin',
  age: 33,
  gender: 'male',
  favLanguage: 'JavaScript',
  specialty: 'Vue',
  catchPhrase: `Let's get diggy with it`
});

joshKnell.speak();
joshKnell.demo('Prototypal Inheritance');
ryanHamblin.grade(javontayMcElroy, 'CSS Preprocessors');

const adamMcKenney = new ProjectManager({
  name: 'Adam',
  location: 'Canada',
  age: 25,
  gender: 'male',
  favLanguage: 'JavaScript',
  specialty: 'React',
  catchPhrase: `I'll let it slide... for now`,
  gradClassName: 'WEB14',
  favInstructor: 'Josh'
});

const ryanBoris = new ProjectManager({
  name: 'Ryan',
  location: 'Chicago',
  age: 30,
  gender: 'male',
  favLanguage: 'CSS',
  specialty: 'Design',
  catchPhrase: 'I live for stuff like this',
  gradClassName: 'WEB14',
  favInstructor: 'Josh'
});

ryanBoris.debugCode(javontayMcElroy, 'lambda classes');
adamMcKenney.standUp('#web17_adam');
adamMcKenney.changeScore(omarSalahEddine);
