import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRegisterService {


  constructor(private http: HttpClient) { }

  downloadFile(filePath: string) {
    let headers = new HttpHeaders({});
    let options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
    let fullUrl = `http://localhost:8090/public/download?fileName=${encodeURIComponent(filePath)}`;
    return this.http.get(fullUrl, options);
  }

  validateCredentials(username: string, password: string) {
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers,
      params: {
        username: username,
        password: password
      }
    };
    let fullUrl = "http://localhost:8090/public/validateCredentials"
    return this.http.get(fullUrl,options);
  }

  savedata(data: any) {
    console.log(data);
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers

    };
    let fullUrl = "http://localhost:8090/public/save"
    return this.http.post(fullUrl, data, options);

  }

  savefile(formData: FormData) {
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers

    };
    let fullUrl = "http://localhost:8090/public/savefile"
    return this.http.post(fullUrl, formData, options);
  }

  findLatestRecord(userid:any) {
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers,
      params: {
        userid: userid
      }
    };
    let fullUrl = "http://localhost:8090/public/findLatestRecord"
    return this.http.get(fullUrl,options);
  }
  finalsubmit(applicantid:any) {
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers,
      params: {
        applicantid: applicantid
      }
    };
    let fullUrl = "http://localhost:8090/public/finalsubmit"
    return this.http.get(fullUrl,options);
  }

  checkmobileno(mobile: any) {
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers,
      params: {
        mobile: mobile
      }
    };
    let fullUrl = "http://localhost:8090/public/checkmobileno"
    return this.http.get(fullUrl,options);
  }

  changePassword(userid: any, newPassword: string) {
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers,
      params: {
        userid: userid,
        newPassword:newPassword
      }
    };
    let fullUrl = "http://localhost:8090/public/changePassword"
    return this.http.get(fullUrl,options);
  }

  getProfilePhoto(filename: any, status: any) {
    let headers = new HttpHeaders({
    });
    let options = {
      headers: headers,
      responseType: 'blob' as 'blob',
      params: {
        filepath: filename,
        status:status
      }
    };
    let fullUrl = "http://localhost:8090/public/getimagefile"
    return this.http.get(fullUrl,options);
  }
}
