export default class HttpGateway {
  apiUrl = "https://api.logicroom.co/api/carlerik@gmail.com";
  get = async (path) => {
    const response = await fetch(this.apiUrl + path);
    const dto = response.json();
    return dto;
  };

  post = async (path, requestDto) => {
    const response = await fetch(this.apiUrl + path, {
      method: "POST",
      body: JSON.stringify(requestDto),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const responseDto = response.json();
    return responseDto;
  };
}
