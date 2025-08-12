import ffmpeg from 'fluent-ffmpeg';

const processVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      // Example: Trim video to first 30 seconds
      .setStartTime('00:00:00')
      .setDuration(30)
      .output(outputPath)
      .on('end', () => {
        resolve(outputPath);
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
};

export default { processVideo };
