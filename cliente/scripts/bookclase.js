class Book extends CreativeWork{
    update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,bookEdition,isbn,numberOfPages,abridged){
        super.update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version)
        this.isbn=isbn;
        this.bookEdition=bookEdition;
        this.numberOfPages=numberOfPages;
        this.abridged=abridged;
    }
}