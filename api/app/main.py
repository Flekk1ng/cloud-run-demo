from fastapi import FastAPI, File, UploadFile, Body, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd

import os

import app.data_processing as data_processing
from app import utils
from app import constants as c

app = FastAPI()

origins = ["https://csv-transformer-zpx7ve2gga-ew.a.run.app/"]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    os.mkdir(utils.get_upload_path())
    os.mkdir(utils.get_download_path())
except FileExistsError:
    pass


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")
    
    upload_path = utils.get_upload_path()
    upload_file_path = os.path.join(upload_path, file.filename)

    if os.path.exists(upload_file_path):
         raise HTTPException(status_code=400, detail=f"File {file.filename} already exists.")

    content = await file.read()
    with open(upload_file_path, "wb") as f:
        f.write(content)

    return {"status": "success", "message": f"File {file.filename} has been successfully uploaded."}


@app.get("/download/{filename}")
async def download_file(filename: str):
    filename = filename + ".xlsx"
    download_file_path = os.path.join(utils.get_download_path(), filename)
    if os.path.exists(download_file_path):
        return FileResponse(download_file_path, media_type='application/octet-stream', filename=filename)
    else:
        raise HTTPException(status_code=404, detail=f"File {filename} not found.")


@app.post("/process")
async def process_files(output_filename: str = Body(..., embed=True)):
    try:
        countries = data_processing.process(output_filename=output_filename)
        return {"status": "success", "message": "All files have been successfully processed.", "countries": countries, "output_filename": output_filename}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.delete("/delete_all")
async def delete_all():
    for filename in os.listdir(utils.get_upload_path()):
        file_path = os.path.join(utils.get_upload_path(), filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return {"status": "success", "message": "All files deleted successfully."}


@app.delete("/delete_file/{filename}")
async def delete_file(filename: str):
    file_path = os.path.join(utils.get_upload_path(), filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"status": "success", "message": f"File {filename} successfully deleted."}
    else:
        raise HTTPException(status_code=404, detail=f"File {filename} not found.")


@app.get("/")
async def root():
    return {"status": "success", "message": "Hello from csv transformer"}