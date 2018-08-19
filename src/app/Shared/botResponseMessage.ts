import { BotResponse } from "./botResponse";

const setAOrB = () => [
    {
        entity: 'cat',
        why: 'Less maintenance. They are so independent just food water and love is required!'
    },
    {
        entity: 'spaces',
        why: 'I can be more specific with them and does not cause issues when going from a person that has tabs at 2 to 4.'
    }
];

const setAccounts = () => [
    {
        entity: 'github',
        link: 'https://github.com/Domon-Casle'
    },
    {
        entity: 'stack overflow',
        link: 'https://stackoverflow.com/users/story/9535264#'
    },
    {
        entity: 'personal website',
        link: 'www.philip-knox.com'
    }
];

const setFavorite = () => [
    {
        entity: 'game',
        answer: 'Monster Hunter World',
        why: 'Love the coop of this game. Lots of things to do with friends!'
    },
    {
        entity: 'programming language',
        answer: 'C#',
        why: 'Has been around long enough now that most issues have been fixed. Making it easier to get things done and know they will be done correctly using system calls. '
    }
];

const setStandsFor = () => [
    {
        entity: 'json',
        answer: 'JavaScript Object Notation'
    },
    {
        entity: 'xml',
        answer: 'Extensible Markup Language'
    },
    {
        entity: 'html',
        answer: 'Hypertext markup language'
    }
];

export class BotResponseMessage {
    private savedAorB = [];
    private savedAccounts = [];
    private savedFavorite = [];
    private savedStandsFor = [];

    constructor() {
        this.savedAorB = setAOrB();
        this.savedAccounts = setAccounts();
        this.savedFavorite = setFavorite();
        this.savedStandsFor = setStandsFor();
    }

    getBotResponse(luisResult) {
        var intent = luisResult.topScoringIntent.intent;
        var entities = luisResult.entities;
        var botResponse = null;

        switch (intent) {
            case 'aOrB':
                var entityA = null;
                var entityB = null;
                var askedWhy = false;

                for (var index in entities) {
                    switch (entities[index].type) {
                        case 'aObj':
                            entityA = entities[index].entity;
                            break;
                        
                        case 'bObj':
                            entityB = entities[index].entity;
                            break;

                        case 'andWhy':
                            askedWhy = true;
                            break;

                        default:
                            console.log('Something is wrong!');
                            break;
                    }
                }

                if (entityA && entityB) {
                    for (var option in this.savedAorB) {
                        if (this.savedAorB[option].entity.toLowerCase() === entityA.toLowerCase()) {
                            botResponse = new BotResponse(
                                'aOrB', 
                                entityA, 
                                this.savedAorB[option].entity, 
                                this.savedAorB[option].why,
                                askedWhy
                            );
    
                            return botResponse.getString();
                        } else if (this.savedAorB[option].entity.toLowerCase() === entityB.toLowerCase()){
                            botResponse = new BotResponse(
                                'aOrB', 
                                entityB, 
                                this.savedAorB[option].entity, 
                                this.savedAorB[option].why,
                                askedWhy
                            );
    
                            return botResponse.getString();
                        }
                    }
                }
            
                return "I am not sure which I prefer.";

            case 'accounts':
                var entity = entities[0].entity;
                for (var option in this.savedAccounts) {
                    if (this.savedAccounts[option].entity.toLowerCase() === entity.toLowerCase()) {
                        botResponse = new BotResponse(
                                'accounts', 
                                entity, 
                                this.savedAccounts[option].entity, 
                                "",
                                false,
                                this.savedAccounts[option].link
                        );

                        return botResponse.getString();
                    }
                }

                return 'I do not have an account for this.';

            case 'favorite':
                var entity = null;
                var askedWhy = false;

                for (var index in entities) {
                    switch (entities[index].type) {
                        case 'andWhy':
                            askedWhy = true;
                            break;
                            
                        default:
                            entity = entities[index].entity;
                            break;
                    }
                }

                for (var option in this.savedFavorite) {
                    if (this.savedFavorite[option].entity.toLowerCase() === entity.toLowerCase()) {
                        botResponse = new BotResponse(
                            'favorite', 
                            entity, 
                            this.savedFavorite[option].answer, 
                            this.savedFavorite[option].why,
                            askedWhy
                        );

                        return botResponse.getString();
                    }
                }

                return 'I dont have a favorite.';

            case 'standsFor':
            var entity = entities[0].entity;
                for (var option in this.savedStandsFor) {
                    if (this.savedStandsFor[option].entity.toLowerCase() === entity.toLowerCase()) {
                        botResponse = new BotResponse(
                            'standsFor', 
                            entity, 
                            this.savedStandsFor[option].answer
                        );

                        return botResponse.getString();
                    }
                }

                return 'Not sure what that stands for';
        }
    }
}