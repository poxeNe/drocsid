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

### Environments:
- There are multiple types of environments as of right now that contain different level ranges of monsters. As of right now, I plan to allow travel to any environment, regardless of level, but if you're not of the recommended level, or adequately geared, that's on you.

##### Current environment types:
- Forest
- Swamps
- Mountains

### Loot:
- Loot is very important and dear to me. This will be a work-in-progress for some time, I'm sure, but the fundamentals are heavily inspired by Diablo, particularly 1 and 2. The itemization in this game is simpler, so early implementations will more closely resemble Diablo 1. Loot is procedurally generated -- base type, rarity, and affixes (prefixes and suffixes), allowing for some pretty cool possibilities, potentially, and also adding that loot slot-machine type experience that I love.