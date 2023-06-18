


export class AppFeature {

    constructor(mongooseQuery,queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
        
    }

            // Pagination 

    paginate () {   

        let page = this.queryString.page * 1 || 1
        if(this.queryString.page <= 0) page = 1
        let skip = (page -1) * 5
        this.page = page
        this.mongooseQuery.skip(skip).limit(5)
        return this
    
    }


    filter () {

        let filterObj = {...this.queryString}
        let excludedQuery = ['page','sort','fields','keyword']
        excludedQuery.forEach((q) => {
            delete filterObj[q]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g , match=> `$${match}`)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }

    // fields () {
    //     if(this.queryString.fields) {
    //         console.log(this.queryString.fields)
    //         let fields = this.queryString.fields.split(',').join(' ')
    //         this.mongooseQuery.select(fields)

    //     }
    //     return this

    // }

    sort () {
        
        if(this.queryString.sort) {
            let sortedBy = this.queryString.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)
        }
        return this

    }

    search () {
        if(this.queryString.keyword) {
            this.mongooseQuery.find({
                $or:  [
                        {title : {$regex : this.queryString.keyword , $options : 'i'}},
                        {description : {$regex : this.queryString.keyword , $options : 'i'}}
                    ]
            })
        }
        return this
    }



}