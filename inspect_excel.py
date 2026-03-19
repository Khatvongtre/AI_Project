import pandas as pd
xl='e:/1. Project/Others/1. AI/AI_Project/Data/Nhà 79 Thanh Đàm.xlsx'
xl_file=pd.ExcelFile(xl)
print('Sheets:', xl_file.sheet_names)
for s in xl_file.sheet_names:
    df=pd.read_excel(xl_file, sheet_name=s)
    print('\nSheet', s, 'shape', df.shape)
    print(df.head(20).to_string(index=False))
