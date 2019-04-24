from google_images_download import google_images_download
import pandas as pd
import sys

def download_image(query):
	absolute_image_paths = response.download({
	    "keywords": query + " breakfast cereal",
	    "limit": 1
	})
	return absolute_image_paths

if __name__ == "__main__":
	if len(sys.argv) != 2:
		print("Need path to cereal dataset CSV.")
		sys.exit(1)
	response = google_images_download.googleimagesdownload()
	df = pd.read_csv(sys.argv[1])	
	paths = [download_image(cereal) for cereal in df["name"]]
	print("Paths: {}".format(paths))
