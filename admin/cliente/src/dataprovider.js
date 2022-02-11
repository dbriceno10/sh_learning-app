import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:3001';
const httpClient = fetchUtils.fetchJson;



const provi={

     getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range')),
        }));
    },
    getOne: (resource, params) => {
        
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
           
    
          let data = json
          data.id = json.id
    
          return {
            data: data,
          }
        })
      },
    
    create: (resource, params) =>

    {          
                 console.log(params)
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
                 
        if(resource ==='students'){
             params.data.role ="alumno"

            httpClient(`${apiUrl}/${'register'}`, {
          
            method: 'POST',
            body: JSON.stringify(params.data),
            
            }).then(({ json }) => ({
                 data: { ...params.data, id: json.id },
            }))

        }else if(resource==='teachers'){
            params.data.role="profesor"
            httpClient(`${apiUrl}/${'register'}`, {
          
                 method: 'POST',
                body: JSON.stringify(params.data),
            
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }))
            }


    },
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),
} 
export default provi;