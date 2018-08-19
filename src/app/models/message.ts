export class Message {
    content: string;
    timestamp: Date;
    user: string;

    constructor(content: string, bot: boolean, timestamp?: Date) {
        this.content = content;
        this.timestamp = timestamp || new Date();
        this.user = bot ? 'Bot' : 'User';
    }
}
