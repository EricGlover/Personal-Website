```Ruby

##minimal viable product
  #store heroes
  #store monsters
  #store items
  #heroes and monsters fight

#My Database Model

#Sequelize

#Hero
  #hero has -> Stats Properties
  #A stat belongs to one -> hero
  #hero has many -> Attacks
  #Attacks can belong to -> many heroes
  #a hero may have one -> class
  #a class may belong to many heroes


#Item
  #item may belong to many -> heroes
  #heroes may have many -> items

#Stats belongs to one -> hero/monster/item/class
  #note: do to separating stats into a table of it's own all
   #things that reference it must include all possible stats
#Loot?

#Rogue
#Wizard
#Warrior
#Ranger?

#Hero Table
  #fname
  #lname
  #bio
  #hometown
  #
  #favoriteQuote
  #lvl
  #xp
  #classId FK
  #statId FK
  #attacks via the join table
  #items-via via join table

#Stats Table
  #health
  #mana
  #armor
  #MR
  #strength
  #intelligence
  #speed
  #carryCapacity
  #dexterity
  #Attacks Table

#Class Table
  #className
  #statId FK

#Item Table
  #description
  #rarity
  #kind (ie weapon, ring, armor, )  NOTE: this should probably point to an item class later?
  #statId FK

#Monster Table
  #statId FK
  #fname
  #lname
  #bio
  #difficultyRating
  #lvl
  #drop
  #xp




#
```text
commands

sequelize model:create --name User --attributes "fname:string lname:string username:string email:string"

CREATE HERO
sequelize model:create --force --name Hero --attributes "fname:string lname:string bio:text hometown:string favoriteQuote:string lvl:integer xp:integer classId:integer statId:integer attackId:integer"

CREATE STAT
sequelize model:create ---force -name Stat --attributes "health:integer mana:integer armor:integer mr:integer strength:integer intelligence:integer dexterity:integer"

//implement this version later
//CREATE ATTACK
//sequelize model:create --name Attack --attributes "statId:integer"

CREATE ATTACK
sequelize model:create --name Attack --attributes "damage:integer"

CREATE ATTACKJoin
sequelize model:create --name AttackJoin --attributes "entityId:integer attackId:integer"

//Note: for the moment this is just a join with Hero Table
  //later it will need to be a polymorphic join table
  //because heroes and monsters all have many attacks

CREATE CLASS
sequelize model:create --name Class --attributes "className:string statId:integer"

CREATE ITEM
sequelize model:create --name Item --attributes "name:string rarity:integer kind:string statId:integer"

CREATE ITEMJOIN
sequelize model:create --name ItemJoin --attributes "heroId:integer itemId:integer"

CREATE MONSTER
sequelize model:create --name Monster --attributes "fname:string lname:string bio:text lvl:integer xp:integer difficultyRating:integer dropItemId:integer"



SEEDS

sequelize seed:create --name attackJoins
sequelize seed:create --name classs
sequelize seed:create --name heros
sequelize seed:create --name items
sequelize seed:create --name itemJoins
sequelize seed:create --name monsters
sequelize seed:create --name stats
sequelize seed:create --name attacks




















//
