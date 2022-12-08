# Drocsid

### A text-based RPG adventure Discord bot!
*Well, that's the plan, anyways...*

Currently built with a CLI but Discord bot functionality is coming once the core mechanics are in place.

### Classes:
- There are currently 3 classes which offer a unique set of starting stats, and a set of 3 starting skills ( out of the 8 core skills ) that are relevant to the class. 

#### Current class list:
- Warrior:
  - HP: 20
  - MP: 5
  - Physical Attack: 10
  - Physical Defense: 5
  - Magikal Attack: 5
  - Magikal Defense: 1
  - Skills:
    - Two-Hand Weapons: 10.1
    - Heavy Armor: 10.1
    - Healing: 5.1
    
- Thief:
  - HP: 15
  - MP: 10
  - Physical Attack: 7
  - Physical Defense: 3
  - Magikal Attack: 5
  - Magikal Defense: 3
  - Skills:
    - One-Hand Weapons: 10.1
    - Light Armor: 10.1
    - Healing: 5.1
    
- Mage:
  - HP: 10
  - MP: 15
  - Physical Attack: 5
  - Physical Defense: 1
  - Magikal Attack: 15
  - Magikal Defense: 5
  - Skills:
    - Evocation: 10.1
    - Mediation: 10.1
    - Healing: 5.1

### Skills:
- The skill system is heavily inspired by Ultima Online, and will work similarly, with skill increases being influenced by what you're using or doing (e.g. attacking with a shortsword will level your One-Hand Weapons skill, casting spells will level your Evocation skill, etc.). Skills have character titles associated with them and are leveled up incrementally ( in 0.1 increments ), starting at 0.0 ( Novice ), and capping out at 100 ( Grandmaster ).

##### Current skill list:
- One-Hand Weapons
- Two-Hand Weapons
- Light Armor
- Heavy Armor
- Evocation
- Meditation
- Healing
- Mining
