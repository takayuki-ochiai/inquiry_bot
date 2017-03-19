secret_file='/usr/local/env.yml'

IFS_SAVE=$IFS
IFS=$'\n'

for line in `cat ${secret_file}`
do
  key=`echo $line | sed -e "s/^\([^ ]*\): \([^ ]*\)$/\1/"`
  value=`echo $line | sed -e "s/^\([^ ]*\): \([^ ]*\)$/\2/"`
  export $key=$value
done

IFS=$IFS_SAVE
