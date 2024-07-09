FROM python:3.11.4
ENV PYTHONUNBUFFERED True

WORKDIR /app/api

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

RUN mkdir -p /app/uploaded_csvs /app/processed_xls

EXPOSE 80
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
