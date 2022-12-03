import {Character} from "./Character";

export const attack = (character: Character, target: Enemy) => {
    const damageToDo = character.doDamage();
    target.takeDamage(damageToDo);
    while (character.health > 0 && enemy.health > 0) {
        const prevEnemyHealth = enemy.health;

        character.doDamage(enemy);
        console.log(`You hit the enemy for ${ prevEnemyHealth - enemy.health } damage.`);

        character.receiveDamage(enemy.damage);
        console.log(`The enemy hits you for ${ enemy.damage } damage.`)

        console.log(`You have ${ character.profession.health } hitpoints remaining.`)
    }
}

export const rest = (character) => {
    character.gold -= 50;
    character.profession.health += 25;

    console.log("You have gained 25 health for 50 gold.");
    console.log(`You now have ${ character.profession.health } health and ${ character.gold }.`)
}
