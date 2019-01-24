/*

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/

/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/
class GameObject {
  constructor (attributes) {
    this.createdAt = attributes.createdAt;
    this.dimensions = attributes.dimensions;
  }

  destroy () {
    return `${this.name} was removed from the game.`;
  }
}

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
class CharacterStats extends GameObject {
  constructor (attributes) {
    super(attributes);
    this.healthPoints = attributes.healthPoints;
    this.name = attributes.name;
  }

  takeDamage () {
    return `${this.name} took damage.`;
  }
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
class Humanoid extends CharacterStats {
  constructor (attributes) {
    super(attributes);
    this.team = attributes.team;
    this.weapons = attributes.weapons;
    this.language = attributes.language;
  }

  greet () {
    return `${this.name} offers a greeting in ${this.language}`;
  }
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    'Staff of Shamalama'
  ],
  language: 'Common Tongue'
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield'
  ],
  language: 'Common Tongue'
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger'
  ],
  language: 'Elvish'
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getLimb () {
  const limbs = ['head', 'chest', 'right arm', 'left arm', 'right leg', 'left leg'];
  return limbs[getRandomInt(limbs.length)];
}

class Hero extends Humanoid {
  constructor (attributes) {
    super(attributes);
    this.weaponDamage = attributes.weaponDamage;
  }

  revitalise (amount) {
    this.healthPoints += amount;
  }

  holyStrike (target) {
    if (this.befuddled && Math.random() < 0.25) {
      console.log(`${this.name} stumbles forward, his befuddled mind causing him to lose balance.`);
      return true;
    }

    const damage = (this.befuddled ? this.weaponDamage * 0.5 : this.weaponDamage * 2) + getRandomInt(10);
    const healed = Math.floor(damage * 0.25);

    this.revitalise(healed);

    target.healthPoints -= damage;

    console.log(`"Nebula valesti!" shouts ${this.name}, his holy claymore hurtling down and cutting a deep gash across ${target.name}'s ${getLimb()}.`);
    if (!this.befuddled) console.log(`The holy pact with his deity aids him in his plight: his health has risen by ${healed} point${healed > 1 ? 's' : ''}.`);
    console.log(`He hits for ${damage} health points: ${target.healthPoints} / 100`);

    if (target.healthPoints <= 0) {
      console.log(`${target.name} can no longer withstand the pain. He collapses to the floor in a pitiful heap.`);
      console.log(target.destroy());
      return false;
    }

    console.log(`${target.name} roars in defiance, parrying ${this.name}'s blow with a swift flick of the wrist.`);

    return true;
  }
}

class Villain extends Humanoid {
  constructor (attributes) {
    super(attributes);
    this.weaponDamage = attributes.weaponDamage;
  }

  waveStaff (target) {
    const damage = this.weaponDamage + getRandomInt(20);

    target.healthPoints -= damage;

    console.log(`Dark tendrils whip around ${this.name}'s ${this.weapons} as he points it at ${target.name}, sapping away at his resolve.`);
    console.log(`He hits for ${damage} health points: ${target.healthPoints} / 100`);

    if (target.healthPoints <= 0) {
      console.log(`${target.name}'s mind has crumbled.`);
      console.log(target.destroy());
      return false;
    }

    console.log(`${target.name} clutches at his eyes and screams as his sanity slips away.`);

    target.befuddled = !target.befuddled;

    return true;
  }
}

const josh = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 4,
    height: 8
  },
  healthPoints: 100,
  name: 'Josh',
  team: 'Asgard',
  weapons: ['Claymore'],
  weaponDamage: 10,
  language: 'English'
});

const adam = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 3,
    width: 6,
    height: 12
  },
  healthPoints: 100,
  name: 'Adam',
  team: 'Celeste',
  weapons: ['Staff of Animation'],
  weaponDamage: 10,
  language: 'English'
});

console.log('***** LET THE BATTLE BEGIN *****');

let battling;

do {
  battling = Math.random() > 0.5 ? adam.waveStaff(josh) : josh.holyStrike(adam);
  console.log('---');
}
while (battling);
