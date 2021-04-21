import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackDto } from "./dto/create.track.dto";
import { Comment, CommentDocument } from "./schemas/comments.schema";
import { Track, TrackDocument } from "./schemas/track.schema";
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from "./dto/create.comment.dto";
import { FileService, FileType } from "src/file/file.service";


@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    try {
      const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
      const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath});
      return track;
    } catch (error) {
      console.log(error)
    }
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    try {
      const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
      return tracks;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id: ObjectId): Promise<Track> {
    try {
      const track = await this.trackModel.findById(id).populate('comments');
      return track;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    try {
      const track = await this.trackModel.findByIdAndDelete(id);
      return track._id;
    } catch (error) {
      console.log(error);
    }
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    try {
      const track = await this.trackModel.findById(dto.trackId);
      const comment = await this.commentModel.create({...dto});
      track.comments.push(comment._id);
      await track.save()

      return comment;
    } catch (error) {
      console.log(error);
    }
  }

  async listen(id: ObjectId) {
    try {
      const track = await this.trackModel.findById(id);
      track.listens += 1;
      track.save();
    } catch (error) {
      console.log(error);
    }
  }

  async search(query: string): Promise<Track[]> {
    try {
      const tracks = await this.trackModel.find({
        name: {$regex: new RegExp(query, 'i')}
      });

      return tracks;
    } catch (error) {
      console.log(error);
    }
  }
}