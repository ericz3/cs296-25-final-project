import pandas as pd

df = pd.read_csv('cereal.csv')
brands = df['name'].unique()
output = "["
for i in brands:
    output = output + "\"" + i + "\", "
output = output +  "]"
print(output)
