#! /usr/env/python

from moviepy.editor import *

video_clip = VideoFileClip("videos/video.mp4")
audio_clip = video_clip.audio

print vars(audio_clip)
import numpy as np

for channel in range(audio_clip.nchannels):
    def make_frame(t):
        # t is numpy.ndarray
#        print type(t)
        array = audio_clip.get_frame(t)
        array = np.hsplit(array, 2)
        print array[channel]
        return array[channel]

    new_audio = AudioClip(make_frame, duration = audio_clip.duration)
    filename = "audio" + `channel`
    new_audio.write_audiofile("videos/" + filename + ".wav", write_logfile = filename)

# for chunk in audio_clip.iter_chunks(chunksize = 1000):
#    for channel in chunk:
#        for frequency in channel:
#            print frequency
