
FROM python:3.12
LABEL org.opencontainers.image.source="https://github.com/patterns/public-rest-api-demo"
WORKDIR /app

##COPY requirements.txt .
COPY examples/mongoengine/requirements.txt .
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
CMD ["uvicorn", "examples.mongoengine.app:app", "--host", "0.0.0.0"]
