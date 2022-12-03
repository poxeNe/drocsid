
const damage = Math.floor(Math.random() * 10 + 1); // 1 - 10 damage
const health = Math.floor(Math.random() * 10 + 21); // 10 - 30 health
const gold = health + damage

const enemy = { damage, health, gold }