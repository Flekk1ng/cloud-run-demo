import os

import app.constants as c

def get_upload_path():
    main_path = os.path.dirname(__file__)
    return os.path.join(main_path, c.UPLOAD_DIR)

def get_download_path():
    main_path = os.path.dirname(__file__)
    return os.path.join(main_path, c.DOWNLOAD_DIR)