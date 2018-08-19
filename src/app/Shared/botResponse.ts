export class BotResponse {
    private type: string;
    private entity: string;
    private answer: string;
    private why: string;
    private askedWhy: boolean;
    private link: string;

    constructor(type: string, entity: string, answer: string, why?: string, askedWhy?: boolean, link?: string) {
        this.type = type;
        this.entity = entity;
        this.answer = answer;
        this.why = why;
        this.askedWhy = askedWhy;
        this.link = link;
    }

    getString() {
        var returnedString = "";

        switch(this.type) {
            case 'aOrB':
                returnedString += 'I prefer ' + this.answer + '.';
                if (this.askedWhy && this.why !== null && this.why.length > 0) {
                    returnedString += ' Why I prefer ' + this.answer + ' is because ' + this.why;
                }
                break;

            case 'accounts':
                returnedString += 'I do have a ' + this.answer + 'account the link to it is: ' + this.link;
                break;

            case 'favorite':
                returnedString += 'My favorite ' + this.entity + ' is ' + this.answer + '.';
                if (this.askedWhy && this.why !== null && this.why.length > 0) {
                    returnedString += ' Its my favorite because ' + this.why;
                }
                break;

            case 'standsFor':
                returnedString += this.entity + ' stands for ' + this.answer;
                break;
        }

        return returnedString;
    }
}