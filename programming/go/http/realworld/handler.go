package realworld

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type User struct {
	Id int `json:"id" validate:"gte=1,lte=1000"`
}

type UserRequest struct {
	User
}

type UserHandler struct {
	validator Validator
}

func NewUserHandler(validator Validator) UserHandler {
	return UserHandler{
		validator: validator,
	}
}

func (h UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.ParseInt(vars["id"], 10, 32)
	req := UserRequest{
		User{
			Id: int(id),
		},
	}
	messages, err := h.validator.Validate(req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintln(w, "Internal Server Error")
		return
	}
	if messages != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, messages)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "user %s", vars["id"])
}
