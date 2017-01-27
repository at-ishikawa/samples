FROM python:2.7

RUN pip install moviepy
RUN pip install docopt

RUN python -c "from moviepy.editor import *"

WORKDIR "app"

# RUN echo deb http://www.deb-multimedia.org testing main non-free >>/etc/apt/sources.list
# RUN apt-get update && apt-get -y install \
#     libx264-dev \
