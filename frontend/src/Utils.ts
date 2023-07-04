export default class Utils {

  static async readUploadedFileAsData(inputFile: Blob) : Promise<string | ArrayBuffer | null> {
    const temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  }

  static sortArrayByField<T>(array: Array<T>, sortField: keyof T) : Array<T> {
    return array.sort( (a: T, b: T) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    })
  }

}