import { useCallback, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, Tooltip, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';

const AtomTag = ({ style = {}, tagStyle = {}, tagInputStyle = {}, initValue = [], addTagText, color, onChange, ...restProps }) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(initValue);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    onChange && onChange(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = useCallback(
    (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
    },
    [tags]
  );

  const showInput = useCallback(() => {
    setInputVisible(true);
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputConfirm = useCallback(() => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  }, [inputValue, tags]);

  const handleEditInputChange = useCallback((e) => {
    setEditInputValue(e.target.value);
  }, []);

  const handleEditInputConfirm = useCallback(() => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  }, [editInputIndex, editInputValue, tags]);

  const inputStyle = useMemo(
    () => ({
      width: 100,
      verticalAlign: 'top',
      ...tagInputStyle
    }),
    [tagInputStyle]
  );

  const tagPlusStyle = useMemo(
    () => ({
      background: token.colorBgContainer,
      borderStyle: 'dashed',
      fontSize: '14px',
      fontWeight: '600'
    }),
    [token.colorBgContainer]
  );

  return (
    <Space size={[0, 8]} wrap style={style}>
      <Space size={[0, 8]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                style={inputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable={true}
              style={{
                userSelect: 'none',
                ...tagStyle
              }}
              color={color || 'blue'}
              onClose={() => handleClose(tag)}
              {...restProps}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </Space>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined size={12}/> {addTagText || 'New Tag'}
        </Tag>
      )}
    </Space>
  );
};
export default AtomTag;
