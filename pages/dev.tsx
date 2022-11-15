import { getLoopPoint, getLoopSine, LoopStructure } from "clumsy-math";
import { SampleRate, _getWavData } from "clumsy-wav";
import { useRef } from "react";

export default function DevPage() {
  const sampleRate: SampleRate = 44100;
  const audioPattern: AudioPattern = {
    sampleRate: sampleRate,
    sampleCount: sampleRate * 3,
    audioParts: [],
  };
  const audioPatternSamples: Array<number> = [];
  for (
    let sampleIndex = 0;
    sampleIndex < audioPattern.sampleCount;
    sampleIndex++
  ) {
    const patternStamp = sampleIndex / audioPattern.sampleCount;
    let audioSample = 0;
    let sampleSignalCount = 0;
    for (
      let partIndex = 0;
      partIndex < audioPattern.audioParts.length;
      partIndex++
    ) {
      const currentAudioPart = audioPattern.audioParts[partIndex];
      const currentPartEnd =
        currentAudioPart.partStart + currentAudioPart.partDuration;
      if (
        patternStamp >= currentAudioPart.partStart &&
        patternStamp <= currentPartEnd
      ) {
        const partStamp = patternStamp - currentAudioPart.partStart;
        const sampleAmplitude = currentAudioPart.getSampleAmplitude(
          partStamp,
          patternStamp
        );
        const sampleFrequency = currentAudioPart.getSampleFrequency(
          partStamp,
          patternStamp
        );
        const sampleLoopStructure = currentAudioPart.getSampleShape(
          partStamp,
          patternStamp
        );
        audioSample +=
          sampleAmplitude *
          getLoopSine({
            someLoopPoint: getLoopPoint({
              inputAngle: sampleFrequency * 2 * Math.PI * partStamp,
              someLoopStructure: sampleLoopStructure,
            }),
          });
        sampleSignalCount += 1;
      }
    }
    audioPatternSamples.push(audioSample / sampleSignalCount);
  }
  const patternWavData = _getWavData({
    sampleRate: audioPattern.sampleRate,
    channelsData: [audioPatternSamples],
  });
  const audioContextRef = useRef<{ audioContext: AudioContext | null }>({
    audioContext: null,
  });
  return (
    <div>
      <button
        onClick={async () => {
          if (audioContextRef.current.audioContext) {
            audioContextRef.current.audioContext.close();
            audioContextRef.current.audioContext = null;
          }
          const currentAudioContext = new AudioContext({
            sampleRate: audioPattern.sampleRate,
          });
          audioContextRef.current.audioContext = currentAudioContext;
          const audioSourceNode = new AudioBufferSourceNode(
            currentAudioContext
          );
          audioSourceNode.buffer = await currentAudioContext.decodeAudioData(
            patternWavData
          );
          audioSourceNode.connect(currentAudioContext.destination);
          audioSourceNode.start();
        }}
      >
        play audio
      </button>
    </div>
  );
}

interface AudioPattern {
  sampleRate: SampleRate;
  sampleCount: number;
  audioParts: Array<AudioPart>;
}

interface AudioPart {
  partStart: number;
  partDuration: number;
  getSampleFrequency: GetAudioPartSample<number>;
  getSampleAmplitude: GetAudioPartSample<number>;
  getSampleShape: GetAudioPartSample<LoopStructure>;
  // getSampleShape: GetAudioPartSample<LoopSignalShape>;
  // getSamplePan: GetAudioPartSample<unknown>
}

type GetAudioPartSample<SampleResult> = (
  partStamp: number,
  patternStamp: number
) => SampleResult;

type LoopSignalShape = Array<
  [
    LoopStructure["subStructure"]["relativeSubRadius"],
    LoopStructure["subStructure"]["relativeSubDepth"],
    LoopStructure["subStructure"]["subPhase"],
    LoopStructure["subStructure"]["subOrientation"],
    LoopStructure["loopRotation"]
  ]
>;
