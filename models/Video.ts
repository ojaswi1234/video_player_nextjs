import mongoose, { Schema, model, models} from "mongoose";



export const videoDimensions = {
    width: 1080,
    height: 1920,
} as const;

export interface IVideo  {
    _id: { type: mongoose.Types.ObjectId, required: true };
    title: string;
    description: string;
    video_url : string;
    thumbnail_url : string;
  
    transformation?: {
        width: number;
        height: number;
        quality?: number;
    }
}

const videoSchema = new Schema<IVideo>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        video_url: {type: String, required: true},
        thumbnail_url: {type: String, required: true},
      
        transformation: {
            width: {type: Number, required: true},
            height: {type: Number, required: true},
            quality: {type: Number, required: false}
        }
    },
    {
        timestamps: true
    }
);

const Video = models?.Video || model<IVideo>('Video', videoSchema);

export default Video;