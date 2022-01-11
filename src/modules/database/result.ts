import { Coordinate } from 'common/types/coordinate';
import { StorageFolder } from './constants';
import { uploadImage, uploadThumbnail } from './image';
import { Result } from './models/result';
import { IResult } from './schemas/result';

export const getLatestResults = (limit = 10) => Result.find({}, {}, { limit });

export async function createResult(steps: Coordinate[], image: Buffer): Promise<IResult> {
	const result = new Result({ steps });
	const idString = result._id.toString();

	await uploadImage(image, { public_id: idString, folder: StorageFolder.MAZES });
	await uploadThumbnail(image, { public_id: idString });

	await result.save();
	return result;
}