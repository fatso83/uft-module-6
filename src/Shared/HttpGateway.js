export default class HttpGateway {
  apiUrl = "https://books-api.carlerik.workers.dev/api/foobar@baz.com";
  //apiUrl = "http://localhost:8787/api/foobar@baz.com";
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
        "Content-Type": "application/json",
      },
    });
    const responseDto = response.json();
    return responseDto;
  };
}
