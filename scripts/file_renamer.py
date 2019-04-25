import os

if __name__ == "__main__":
    os.chdir("downloads")
    current_directory = "."
    subdirectories = [os.path.join(current_directory, o) for o in os.listdir(current_directory) if os.path.isdir(os.path.join(current_directory, o))]

    print (subdirectories)
    
    for dir in subdirectories:
        os.chdir(dir)
        os.system("mv *.jpg image.jpg")
        os.chdir("..")
