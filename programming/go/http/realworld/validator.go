package realworld

import (
	"github.com/pkg/errors"

	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	validator "gopkg.in/go-playground/validator.v9"
	en_translations "gopkg.in/go-playground/validator.v9/translations/en"
)

type Validator struct {
	validate   *validator.Validate
	translator ut.Translator
}

func NewValidator() (Validator, error) {
	v := validator.New()

	localeEn := en.New()
	uni := ut.New(localeEn, localeEn)
	trans, found := uni.GetTranslator("en")
	if !found {
		return Validator{}, errors.New("failed to get translator for en")
	}
	en_translations.RegisterDefaultTranslations(v, trans)
	return Validator{
		validate:   v,
		translator: trans,
	}, nil
}

func (v *Validator) Validate(req interface{}) (map[string]string, error) {
	err := v.validate.Struct(req)
	if err != nil {
		errs, ok := err.(validator.ValidationErrors)
		if !ok {
			return nil, err
		}
		return errs.Translate(v.translator), nil
	}
	return nil, nil
}
