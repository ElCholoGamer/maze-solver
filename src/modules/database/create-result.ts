import { Coordinate } from 'common/types/coordinate';
import { Result } from './models/result';
import { IResult } from './schemas/result';
import { uploadImage, uploadThumbnail } from './upload-image';

export async function createResult(steps: Coordinate[], image: Buffer): Promise<IResult> {
	const result = new Result({ steps });
	const idString = result._id.toString();

	await uploadImage(image, { public_id: idString, folder: 'mazes' });
	await uploadThumbnail(image, { public_id: idString });

	await result.save();
	return result;
}
