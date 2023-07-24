export enum ArtifactType { speed, xp }
export class Artifact {
    title: string;
    description: string;
    // based on this we calculate how much xp you'll get, or how faster you will complete tasks
    value: number;
    type: ArtifactType;

    constructor(title: string, description: string, value: number, type: ArtifactType) {
        this.title = title;
        this.description = description;
        this.value = value;
        this.type = type;
    }
}