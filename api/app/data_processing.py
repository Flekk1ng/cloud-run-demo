import os
from collections import defaultdict

from app import constants as c
from app import tasks

main_path = os.path.dirname(__file__)

upload_directory = os.path.join(main_path, c.UPLOAD_DIR)


def process(*, output_filename):
    csv_names = get_csv_names()

    [countries, report_type_country_filenames] = analyze_file_names(csv_names)
    tasks.run_tasks(report_type_country_filenames=report_type_country_filenames, output_filename=output_filename)

    return countries


def analyze_file_names(file_names):
    """
    Для каждой страны 6 разных отчетов которые содержаться в c.REPORT_TYPES
    """
    report_type_country_filenames = defaultdict(dict)
    country_report_types = defaultdict(set)

    all_parts = [file_name.split('_') for file_name in file_names]

    common_parts = set(all_parts[0])
    for parts in all_parts[1:]:
        common_parts &= set(parts)

    product_num = '_'.join(common_parts)

    for file_name in file_names:
        parts = file_name.split('_')

        common_part_index = parts.index(product_num)
        
        country = ' '.join(parts[:common_part_index])
        report_type, _ = os.path.splitext('_'.join(parts[common_part_index + 2:]))

        if report_type not in c.REPORT_TYPES:
            raise Exception(f"Неизвестный тип отчета: {report_type}")
        
        report_type_country_filenames[report_type].update({country: file_name})

        country_report_types[country].add(report_type)

    for country, report_types_set in country_report_types.items():
        if len(report_types_set) != len(c.REPORT_TYPES):
            missing_report_types = set(c.REPORT_TYPES) - report_types_set
            raise Exception(f"Страна '{country}' не содержит следующие типы отчетов: {', '.join(missing_report_types)}")

    return [list(country_report_types.keys()), report_type_country_filenames]

def get_csv_names():
    file_names = []
    for filename in os.listdir(upload_directory):
        if os.path.isfile(os.path.join(upload_directory, filename)):
            file_names.append(filename)

    if not file_names:
        raise Exception("Нет загруженных csv файлов.")
    
    if len(file_names) < 12:
        raise Exception("Мало загруженных файлов для создания отчета. Проверьте загруженные файлы.")
    
    return file_names